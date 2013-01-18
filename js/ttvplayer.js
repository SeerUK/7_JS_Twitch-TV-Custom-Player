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
 */


;(function( $ , jtv, window ) {

    "use strict";

    if ( !$ )   { throw '[TTVPlayer]::Missing dependency: jQuery' }
    if ( !jtv ) { throw '[TTVPlayer]::Missing dependency: JTV / TTV JavaScript API' }

    // --------------------------------------------------------------------- //

    var TTVPlayer = (function(container, options) {

        var that = this;

        that.options           = $.extend(true, {}, that.defaults, options);
        that.options.container = container;
        that.options.height    = that.options.height || that.options.container.height();
        that.options.width     = that.options.width  || that.options.container.width();
        that.status            = { paused: false, playing: false, stopped: true };

        if ( !that.verifyRequired( that ) ) { throw '[TTVPlayer]::There was a problem with your options' };



        return that;

    });


    TTVPlayer.prototype.defaults = {
        autoPlay:          true,
        startVolume:       26,
        watermarkPosition: 'top_right'
    }


    TTVPlayer.prototype.verifyRequired = function( that ) {

        if ( 'undefined' === typeof that.options.channel || 'string' !== typeof that.options.channel )         { return false };
        if ( 'undefined' === typeof that.options.consumerKey || 'string' !== typeof that.options.consumerKey ) { return false };

        return true;

    };


    TTVPlayer.prototype.construct = function( that ) {

    }

    // --------------------------------------------------------------------- //

    $.fn.ttvplayer = function(options) {
        return new TTVPlayer($(this), options);
    };


    window.TTVPlayer = TTVPlayer;

})( jQuery , jtv_api , window );