'use babel';

import TardisView from './tardis-view';
import { CompositeDisposable } from 'atom';

export default {

  tardisView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tardisView = new TardisView(state.tardisViewState);
    activePath = atom.workspace.getActiveTextEditor().getPath();
    this.tardisView.setPath(activePath);
    this.tardisView.setPastIndicator(true);
    this.modalPanel = atom.workspace.addTopPanel({
      item: this.tardisView.getElement(),
      priority: 0
    });

    atom.workspace.onDidStopChangingActivePaneItem( (e) => {
      activePath = atom.workspace.getActiveTextEditor().getPath();
      this.tardisView.setPath(activePath);
      itemsCount = atom.workspace.getPaneItems().length;
      this.tardisView.setCount(itemsCount);
      isInPast = (itemsCount-1) - atom.workspace.getActivePane().getActiveItemIndex();
      this.tardisView.setPastIndicator(isInPast);
    });

    atom.workspace.onDidAddPaneItem( (event) => {
      paneItems = atom.workspace.getActivePane().getItems();
      startIndex = event.index + 1;
      for(var i = startIndex; i < paneItems.length; i++ ) {
        atom.workspace.getActivePane().destroyItem(paneItems[i]);
      }
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tardis:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tardisView.destroy();
  },

  serialize() {
    return {
      tardisViewState: this.tardisView.serialize()
    };
  },

  toggle() {
    console.log('Tardis was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
