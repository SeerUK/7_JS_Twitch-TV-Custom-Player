/*!
 * Unknown Degree  Live
 *   Twitch TV Player
 *
 * @author  Elliot Wright
 * @website http://www.unknowndegree.com/live
 * @version 0.1a
 *
 * Note: Requires jQuery (made with jQuery 1.9)
 * Note: Requires the JTV JavaScript API (that's jtv_api.js)
 *
 * ~ Don't worry, we've done the science ~
 *
 */


;(function( $ , jtv, window ) {

    "use strict";

    if ( !$ )   { throw '[TTVPlayer]::Missing dependency: jQuery'; return; };
    if ( !jtv ) { throw '[TTVPlayer]::Missing dependency: JTV / TTV JavaScript API'; return; };

    // --------------------------------------------------------------------- //

    var TTVPlayer = (function(container, options) {

        var that = this;

        that.options           = $.extend(true, {}, that.defaults, options);
        that.options.container = container[0].id;
        that.options.height    = that.options.height || container.height();
        that.options.width     = that.options.width  || container.width();
        that.status            = { paused: false, playing: false, stopped: true };

        if ( !that.verifyRequired( that ) ) { throw '[TTVPlayer]::There was a problem with your options'; return; };

        // Construct player object...
        return that.construct( that );

    });


    TTVPlayer.prototype.defaults = {
        autoPlay:           true,
        height:             300,
        startVolume:        26,
        watermarkPosition:  'top_right',
        width:              500
    };


    TTVPlayer.prototype.verifyRequired = function( that ) {

        if ( 'undefined' === typeof that.options.channel     || 'string' !== typeof that.options.channel )     { return false };
        if ( 'undefined' === typeof that.options.consumerKey || 'string' !== typeof that.options.consumerKey ) { return false };

        return true;

    };


    TTVPlayer.prototype.construct = function( that ) {

        that.player = jtv.new_player(that.options.container, {
            channel:       that.options.channel,
            consumer_key:  that.options.consumerKey,
            auto_play:     that.options.autoPlay,
            custom:        true
        });

        var deferred = setInterval( function() {

            if ('function' === typeof that.player.change_volume)
            {
                that.player.change_volume(that.options.startVolume);
                that.player.resize_player(that.options.width, that.options.height); // Not working?

                //
                // todo: register player events here!
                //

                // The interval shall only be cleared when the options have been set properly:
                clearInterval(deferred);
            }

        }, 500);

        return that.player;

    };

    // --------------------------------------------------------------------- //

    $.fn.ttvplayer = function( options ) {
        return new TTVPlayer( $(this) , options );
    };

    window.TTVPlayer = TTVPlayer;

})( jQuery , jtv_api , window );