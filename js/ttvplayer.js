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


;(function( $ , jtv ) {

    /** Dependency Check...
    ==================== */
    if ( !$ )   { throw '[TTVPlayer]::Missing dependency: jQuery' }
    if ( !jtv ) { throw '[TTVPlayer]::Missing dependency: JTV / TTV JavaScript API' }


    var TTVPlayer = (function() {

    });


    $.fn.ttvplayer = (function(options) 
    {
        return this.each( function() 
        {
            return new TTVPlayer($(this), options);
        });
    });

})( jQuery , jtv_api );