cb = window.cb || {};
cb.debug = window.cb.debug || function () {};

var UpdateRegistrar = function () {
    this.filters = [];
    this.currentZone = window.act.currentZone();
};

UpdateRegistrar.prototype.register = function(filter) {
    this.filters.push(filter);

    var defaultFunctions = [
        'enterZone',
        'filtersZone',
        'leaveZone',
        'processLogs',
        'tick',
    ];
    for (var i = 0; i < defaultFunctions.length; ++i) {
        var func = defaultFunctions[i];
        if (!filter[func]) {
            filter[func] = function() { return false; }
        }
    }

    var currentZone = window.act.currentZone();
    if (filter.filtersZone(currentZone)) {
        filter.enterZone(currentZone);
    }
};

UpdateRegistrar.prototype.tick = function (currentTime) {
    var currentZone = window.act.currentZone();
    if (this.currentZone != currentZone) {
        for (var i = 0; i < this.filters.length; ++i) {
            if (this.filters[i].filtersZone(this.currentZone)) {
                this.filters[i].leaveZone(this.currentZone);
            }
        }

        this.currentZone = currentZone;

        cb.debug('Entering zone: ' + this.currentZone);
        for (var i = 0; i < this.filters.length; ++i) {
            if (this.filters[i].filtersZone(this.currentZone)) {
                this.filters[i].enterZone(this.currentZone);
            }
        }
    }

    var activeFilters = [];
    for (var i = 0; i < this.filters.length; ++i) {
        if (this.filters[i].filtersZone(currentZone)) {
            activeFilters.push(this.filters[i]);
        }
    }

    // Log entries before ticking.
    var logs = window.act.getLogLines();
    if (logs) {
        for (var i = 0; i < activeFilters.length; ++i) {
            activeFilters[i].processLogs(logs);
        }
    }

    for (var i = 0; i < activeFilters.length; ++i) {
        var filter = activeFilters[i];
        if (filter.lastTick && filter.throttleTickMs) {
            var elapsed = currentTime.getTime() - filter.lastTick.getTime();
            if (elapsed < filter.throttleTickMs) {
                continue;
            }
        }
        filter.tick(currentTime);
        filter.lastTick = currentTime;
    }
}
cb.updateRegistrar = new UpdateRegistrar();

var WindowManager = function () {
    this.windows = [];
    this.layoutMode = false;

    document.addEventListener('contextmenu', function(e){
        if (this.onRightClick(e.target))
            e.preventDefault();
    }.bind(this), false);
};
WindowManager.prototype.add = function (name, element, title, geometry) {
    cb.debug('Added window: ' + title);

    this.windows[name] = {
        name: name,
        element: element,
        visible: true,
    };
    this.loadLayout(name, element, geometry);
    this.SetWindowVisible(name, this.windows[name].visible);

    element.classList.add('cactbotwindow');

    // Add title for layout mode.
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('cactbotwindowname');
    var titleText = document.createElement('div');
    titleText.innerHTML = title;
    titleDiv.appendChild(titleText);
    element.appendChild(titleDiv);

    $(element).draggable({ disabled: true });
    $(element).resizable({ handles: 'all', disabled: true });

    // This should have a default, always.
    console.assert(element.style.height, 'Missing default height: ' + name);
    console.assert(element.style.width, 'Missing default width: ' + name);
};
WindowManager.prototype.remove = function (name) {
    delete this.windows[name];
};
WindowManager.prototype.enableLayoutMode = function () {
    if (this.layoutMode) {
        return;
    }
    this.layoutMode = true;
    for (var name in this.windows) {
        var element = this.windows[name].element;
        element.classList.add('layoutmode');
    }
    $('.cactbotwindow').draggable('enable');
    $('.cactbotwindow').resizable('enable');
};
WindowManager.prototype.disableLayoutMode = function () {
    if (!this.layoutMode) {
        return;
    }
    this.layoutMode = false;
    for (var name in this.windows) {
        this.windows[name].element.classList.remove('layoutmode');
        this.saveLayout(name, this.windows[name].element);
    }
    $('.cactbotwindow').draggable('disable');
    $('.cactbotwindow').resizable('disable');
};
WindowManager.prototype.storageKey = function (name) {
    return 'geom.' + name;
};
WindowManager.prototype.saveLayout = function (name, element) {
    var info = {
        top: element.style.top,
        left: element.style.left,
        width: element.style.width,
        height: element.style.height,
        visible: this.windows[name].visible,
    };
    window.localStorage.setItem(this.storageKey(name), JSON.stringify(info));
};
WindowManager.prototype.loadLayout = function (name, element, geometry) {
    var infoStr = window.localStorage.getItem(this.storageKey(name));
    var info = infoStr ? JSON.parse(infoStr) : geometry;

    for (var key in info) {
        console.assert(info.hasOwnProperty(key));
        if (key === 'visible') {
            this.windows[name].visible = info[key];
            continue;
        }
        element.style[key] = info[key];
    }
};
WindowManager.prototype.onRightClick = function(element) {
    if (!this.layoutMode)
        return false;

    var originalElement = element;
    while (!element.classList.contains('cactbotwindow')) {
        element = element.parentNode;
        if (!element) {
            console.log('Element not in tree of window', originalElement);
            return false;
        }
    }

    var windowName;
    for (var name in this.windows) {
        if (element == this.windows[name].element) {
            windowName = name;
            break;
        }
    }
    if (!windowName) {
        console.log('No window associated with element', element);
        return false;
    }

    this.SetWindowVisible(name, !this.windows[name].visible);
    return true;
};
 WindowManager.prototype.SetWindowVisible = function(name, visible) {
     this.windows[name].visible = visible;
     var element = this.windows[name].element;

     if (visible) {
         element.classList.remove('hidden');
     } else {
         element.classList.add('hidden');
     }
 };

cb.windowManager = new WindowManager();
cb.enableLayoutMode = function () {
    cb.windowManager.enableLayoutMode();
}
cb.disableLayoutMode = function () {
    cb.windowManager.disableLayoutMode();
}

function rafLoop() {
    window.requestAnimationFrame(rafLoop);
    if (!window.act) {
        return;
    }
    window.act.updateCombatants();

    var currentTime = new Date();
    cb.updateRegistrar.tick(currentTime);

}

window.requestAnimationFrame(rafLoop);