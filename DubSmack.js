var dubsmack = {
    settings: {
        autowoot: true,
        autoqueue: false,
        songstats: true,
        cpd: false
    },
    version: "0.0.2",
    stats: {
        songs: 0,
        currenttrack: $(".currentSong").html(),
        woots: 0,
        grabs: 0,
        mehs: 0
    },
    newSong: function() {
        setInterval(function() {
            if (dubsmack.settings.autowoot == true) {
                if (dubsmack.stats.currenttrack !== $(".currentSong").html()) {
                    $(".dubup").click();
                    dubsmack.stats.currenttrack = $(".currentSong").html();
                }
            }
        }, 1500);
    },
    getstorage: function() {
        if (localStorage.dubsmacksettings == undefined) {
            localStorage.setItem("dubsmacksettings", JSON.stringify(dubsmack.settings));
        } else {
            var retrievedData = localStorage.getItem("UIbeeps");
            var list = JSON.parse(retrievedData);
            dubsmack.settings = list;
        }
    },
    updatestorage: function() {
        return localStorage.setItem("dubsmacksettings", JSON.stringify(dubsmack.settings));
    },
    startup: function() {
        $(".dubup").click();
        dubsmack.notify('DubSmack ' + this.version + ' is now loaded!', 'red');
        this.proxy = {
            newSong: $.proxy(this.newSong, this)
        };
        dubsmack.newSong();
        $('#header-global > div.nav-collapse.collapse.user-info > ul > li:nth-child(2)').prepend('<button class="ds-button"><span>DubSmack Settings</span></button>'); //Adding DubSmack Settings Button.
        $('body').append('<div id="ds-menu"><section id="ds-contents"><ul><li id="item-1">AutoDub</li>   <li id="item-2">Song Stats</li>   <li id="item-3">Legacy Plug Design</li></ul></section></div>'); //Adding DubSmack Settings Menu.
        var tempkey = Object.keys(dubsmack.settings);
        for (var i = 0; i < tempkey.length; i++) {
			if (dubsmack.settings[tempkey[i]] == true) {
					
			}
        }
        $('.ds-button').click(dubsmack.dsmenu);
        dubsmack.getstorage();
    },
    notify: function(message, color) {
        $('.chat-main').append('<li class=""><div class="stream-item-content"><div class="image_row"><img src="https://api.dubtrack.fm/user/56097b7981c87803009bcf0e/image" alt="DubSmack" class="cursor-pointer" onerror="Dubtrack.helpers.image.imageError(this);"></div><div class="activity-row"><div class="text"><p style="color:' + color + ';">' + message + '</p></div><div class="meta-info"><span class="username">DubSmack </span><i class="icon-dot"></i><span class="timeinfo"><time class="timeago" datetime="2015-10-01T01:10:35.036Z" title="9/30/2015, 9:10:35 PM"></time></span></div></div></div></li>');
    },
    dsmenu: function() {
        if ($('#ds-menu').css('display') == "none") {
        	$('#ds-menu').show();

            $('#ds-contents > ul > li').click(function(e) {
            	if (e.currentTarget.id == "item-1") { //AutoDub.
            		if (dubsmack.settings.autowoot == true) {
            			dubsmack.settings.autowoot = false;
            			$("#item-1").removeClass("selected");
            		} else {
            			dubsmack.settings.autowoot = true;
            			$("#item-1").addClass("selected");
            		}
            	} else if (e.currentTarget.id == "item-2") { //Song stats.
            		if (dubsmack.settings.songstats == true) {
            			dubsmack.settings.songstats = false;
            			$("#item-2").removeClass("selected");
            		} else {
            			dubsmack.settings.songstats = true;
            			$("#item-2").addClass("selected");            			
            		}
            	} else if (e.currentTarget.id == "item-3") { //Classic Plug View.
            		if (dubsmack.settings.cpd == true) {
            			dubsmack.settings.cpd = false;
             			$("#item-3").removeClass("selected");           			
            		} else {
            			dubsmack.settings.cpd = true;
            			$("#item-3").addClass("selected");            			
            		}
            	}
            	return dubsmack.updatestorage();
            });

        } else {
            $('#ds-menu').hide();
        }
    }
};

dubsmack.startup();