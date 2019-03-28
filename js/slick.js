$(function() {
    //    cache first carousel
    var $org = $('.carousel');
 
    //    variables
    var width = 800,
        height = 500,
        cols = 8,
        rows = 5,
        $img = $org.children()
        imgs = $img.length;
 
    //    duplicate carouesl
    for( a = 0; a < rows * cols; a++ ) {
        $('#wrapper').append( $org.clone() );
    }
    
    //    cache all carousls
    $all = $('.carousel');
    $all.each(function( i ) {
    
        //    current row and column
        var row = Math.floor( i / cols ),
            col = i % cols;
 
        var $t = $(this),
            i2 = i % imgs,
            $x = $img.eq( i2 ).clone();
 
        //    first image -> thumbnail
        $x.addClass( 'thumb' );
        $t.prepend( $x );
 
        var $d = $t.children();
 
        //    onClick start scrolling the first carousel
        $t.click(function() {
            var d = ( $t.triggerHandler( 'currentPosition' ) == 0 ) ? i2+1 : 0;
            $org.trigger( 'slideTo', d );
        });
 
        //    set width + height
        $t.add( $d ).css({
            width: width / cols,
            height: height / rows
        });
        
        //    position images
        $d.children().css({
            left: -(col * (width / cols)),
            top: -(row * (height / rows))
        });
    });
    
    //    create carousels
    $all.carouFredSel({
        circular: false,
        items: {
            visible: 1,
            width: width / cols,
            height: height / rows
        },
        scroll: {
            fx: 'directscroll',
            onBefore: function() {
                var $t = $(this);
 
                //    trigger next carousel to scroll after 25 ms.
                setTimeout(function() {
                    $t.parent().next().children().trigger( 'slideTo', $t.triggerHandler( 'currentPosition' ) );
                }, 25);
            }
        }
    }).trigger( 'pause' );
});