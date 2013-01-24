/*!
 * Unknown Degree  Live
 *   Twitch TV Player
 *
 * @author  Elliot Wright
 * @website http://www.unknowndegree.com/live
 * @version 0.1a
 *
 * Note: Requires jQuery (made with jQuery 1.9)
 * Note: Requires the JTV JavaScript API (this's jtv_api.js)
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

        this.options = $.extend(true, {}, this.defaults, options);

        this.options.container  = container;
        this.options.instanceId = instanceId;

        this.options.height = this.options.height || container.height();
        this.options.width  = this.options.width  || container.width();
        this.status         = { paused: false, playing: false, stopped: true };

        if ( !this.verifyRequired( this ) ) { throw '[TTVPlayer]::There was a problem with your options'; return; };

        // Construct player object...
        this.construct();

        return this;
    });


    TTVPlayer.prototype.defaults = {
        autoPlay:           true,
        height:             400,
        startVolume:        26,
        watermarkPosition:  'top_right',
        width:              900
    };


    TTVPlayer.prototype.verifyRequired = function() {

        if ( 'undefined' === typeof this.options.channel     || 'string' !== typeof this.options.channel )     { return false };
        if ( 'undefined' === typeof this.options.consumerKey || 'string' !== typeof this.options.consumerKey ) { return false };

        return true;

    };


    TTVPlayer.prototype.construct = function() {

        var that = this;

        this.player = jtv.new_player(this.options.instanceId, {
            channel:       this.options.channel,
            consumer_key:  this.options.consumerKey,
            auto_play:     this.options.autoPlay,
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

        this.constructControls();
        this.bindEvents();

    };

    // -- Controls --------------------------------------------------------- //

    TTVPlayer.prototype.constructControls = function() {

    };

    // -- Events ----------------------------------------------------------- //

    TTVPlayer.prototype.bindEvents = function() {

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