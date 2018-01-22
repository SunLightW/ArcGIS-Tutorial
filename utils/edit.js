
var editingEnabled = false;
function initEditing(evt) {
    var editToolbar = new Edit(map);
    editToolbar.on("deactivate", function (evt) {
        if (evt.info.isModified) {
            firePerimeterFL.applyEdits(null, [evt.graphic], null);
        }
    });
}

function jjj(evt) {
    event.stop(evt);
    if (editingEnabled) {
        editingEnabled = false;
        editToolbar.deactivate();
        firePerimeterFL.clearSelection();
    }
    else {
        editingEnabled = true;
        editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
        // select the feature to prevent it from being updated by map navigation
        var query = new Query();
        query.objectIds = [evt.graphic.attributes[firePerimeterFL.objectIdField]];
        firePerimeterFL.selectFeatures(query);
    }
}