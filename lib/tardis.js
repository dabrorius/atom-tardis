'use babel';

import TardisView from './tardis-view';
import { CompositeDisposable } from 'atom';

export default {

  tardisView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tardisView = new TardisView(state.tardisViewState);
    this.modalPanel = atom.workspace.addTopPanel({
      item: this.tardisView.getElement(),
      priority: 0
    });

    this.updatePanelContent();
    atom.workspace.onDidStopChangingActivePaneItem( () => {
      this.updatePanelContent();
    });

    atom.workspace.onDidAddPaneItem(this.closePanesToRight);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tardis:toggle': () => this.toggle()
    }));
  },

  updatePanelContent() {
    activeTextEditor = atom.workspace.getActiveTextEditor();
    if(activeTextEditor) {
      this.tardisView.setPath(activeTextEditor.getPath());
    } else {
      this.tardisView.setPath('EXTERMINATE!');
    }
  },

  closePanesToRight(event) {
    paneItems = atom.workspace.getActivePane().getItems();
    startIndex = event.index + 1;
    for(var i = startIndex; i < paneItems.length; i++ ) {
      atom.workspace.getActivePane().destroyItem(paneItems[i]);
    }
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
