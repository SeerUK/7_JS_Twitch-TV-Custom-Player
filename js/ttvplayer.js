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

    // -- Player Instance -------------------------------------------------- //

    var TTVPlayer = (function(container, instanceId, options) {

        var that = this;

        that.options        = $.extend(true, {}, that.defaults, options);

        that.options.container  = container;
        that.options.instanceId = instanceId;

        that.options.height = that.options.height || container.height();
        that.options.width  = that.options.width  || container.width();
        that.status         = { paused: false, playing: false, stopped: true };

        if ( !that.verifyRequired( that ) ) { throw '[TTVPlayer]::There was a problem with your options'; return; };

        // Construct player object...
        that.construct( that );

        return that;
    });


    TTVPlayer.prototype.defaults = {
        autoPlay:           true,
        height:             400,
        startVolume:        26,
        watermarkPosition:  'top_right',
        width:              900
    };


    TTVPlayer.prototype.verifyRequired = function( that ) {

        if ( 'undefined' === typeof that.options.channel     || 'string' !== typeof that.options.channel )     { return false };
        if ( 'undefined' === typeof that.options.consumerKey || 'string' !== typeof that.options.consumerKey ) { return false };

        return true;

    };


    TTVPlayer.prototype.construct = function( that ) {

        that.player = jtv.new_player(that.options.instanceId, {
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

        that.constructControls( that );
        that.bindEvents( that );

    };

    // -- Controls --------------------------------------------------------- //

    TTVPlayer.prototype.constructControls = function( that ) {

    };

    // -- Events ----------------------------------------------------------- //

    TTVPlayer.prototype.bindEvents = function( that ) {

    };

    // -- jQuery ----------------------------------------------------------- //

    $.fn.ttvplayer = function( options ) {
        return this.each( function(i, v) {
            var instanceId = 'ttvplayer-' + (i + 1);
            $(this).append( $('<div>').attr('id', instanceId) );

            return new TTVPlayer( $(this) , instanceId , options );
        });
    };

    window.TTVPlayer = TTVPlayer;

})( jQuery , jtv_api , window );