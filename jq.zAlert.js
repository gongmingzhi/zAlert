/**
 * 客户端风格弹框
 */
;( function ( window, $, undefined ){
    
    //alert object
    var zAlert = function ( config ){
        config = config || {};
    
        var settings = zAlert_core_default;
    
        for ( var i in settings ){
            if ( config[ i ] === undefined ){
                config[ i ] = settings[ i ];
            }
        }
    
        zAlert.zAlertCache = zAlert.zAlertCache === undefined ? [] : zAlert.zAlertCache;
    
        return zAlert.zAlertCache.push( new zAlert.fn._init( config ) );
    
    }
    
    //template for alert
    zAlert_core_template = '<div class="zalert-container">' +
                                '<div class="zalert-head">'+
                                    '<span class="zalert-title-text"></span>' +
                                    '<span class="zalert-close-icon"></span>' +
                                '</div>' +
                                '<div class="zalert-body">' +
                                    '<span class="zalert-content-text"></span>' +
                                '</div>' +
                            '</div>';
    
    //the default settings
    zAlert_core_default = {
        title:          'Warning',
        content:        'balabala ```',
        marginRight:    5,
        marginBottom:   5,
        fadeOutTime:    500,
    };
    
    //prototype
    zAlert.fn = zAlert.prototype = {
        
        constructor : zAlert,
    
        _init : function ( config ) {
            var that = this;
            this.DOM = this._getDom();
    
            $( 'body' ).append( this.DOM );
    
            this._initStatics()
            ._setContent( config )
            ._positionDOM( config )
            ._show( config )
            ._addEventListener();
    
            setTimeout( function (){
                that._hide.call( that, config );
            }, 2000);
    
            return this;
    
        },
    
        _initStatics : function (){
            this.DOMHeight = this.DOM.outerHeight();
            this.DOMWidth = this.DOM.outerWidth();
            return this;
        },
    
        _setContent : function ( config ){
            this.DOM.find( '.zAlert-title-text' ).text( config.title );
            this.DOM.find( '.zalert-content-text' ).text( config.content );
            return this;
        },

        _getDom : function (){
            var DOM = $( zAlert_core_template );
            this.timeID = new Date().getTime();
            DOM.attr( 'zId', this.timeID );
            return DOM;
    
        },
    
        _show : function ( config ){
            this.DOM.animate( {
                top : this.clientHeight - this.DOMHeight - config.merginBottom - this.positionTop
            } );
    
            return this;
        },
    
        _hide : function ( config ){
            var that = this;
            this.DOM.fadeOut( config.fadeOutTime, function (){
                that._destory();
            } );
    
            return that;
    
        },
    
        _destory : function (){
            var cache = zAlert.zAlertCache,
            i = 0;
    
            for ( ; i < cache.length; i ++){
                if ( this.timeID === cache[ i ].timeID ){
                    zAlert.zAlertCache.splice( i, 1 );
                    this.DOM.remove();
                    this.DOM = null;
                }
            }
    
        },
    
        _addEventListener : function (){
            var that = this;
            that.DOM.find( '.zalert-close-icon' ).bind( 'click', function (){
                that._destory();
            } );
    
            return that;
        },
    
        _positionDOM : function ( config ){
            
            var cache = zAlert.zAlertCache,
            i = 0,
            positionBottom = config.marginBottom;
            for ( ; i < cache.length; i ++ ){
                positionBottom += cache[ i ].DOMHeight + config.marginBottom;
            }
    
            this.positionBottom = positionBottom;
            this.clientHeight = document.body.clientHeight;
            this.clientWidth = document.body.clientWidth;
            
            this.DOM.css( {
                'display':    'block',
                'right':      config.marginRight,
                'bottom':     this.positionBottom
            } )

            return this;
        }
    
    
    }
    
    zAlert.fn._init.prototype = zAlert.fn;
    window.zAlert = $.zAlert = zAlert;
    
} )( window, jQuery );