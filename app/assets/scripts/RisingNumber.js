let RisingNumber = function() {

  this.new = ( e, type, amount = null ) => {

    let el = document.createElement( 'div' )

    el.style.position = 'absolute'
    el.style.pointerEvents = 'none'
    el.style.color = 'white'
    el.style.fontSize = '20px'
    el.style.fontFamily = 'Germania One'
    el.style.left = e.clientX + get_random_num( -20, 20 ) + 'px'
    el.style.top = e.clientY + get_random_num( -5, 5 ) + 'px'
    el.style.animation = 'flyingNumber 2s forwards ease-out';

    el.innerHTML = `+${ amount }`

    // TYPES
    switch ( type ) {
      case 'weak-hit-click':
        el.style.fontSize = '28px'
        break;

      case 'successful-buy':
        el.innerHTML = '-$'
        el.style.color = 'red'
        el.style.fontSize = '30px'
        break;

      case 'combo':
        el.innerHTML = `${ amount } hit combo`
        el.style.color = get_random_color()
        el.style.fontSize = '35px'
        el.style.animationDuration = '3s'
        break;

      default:
        break;
    }

    s( 'body' ).append( el )

    el.addEventListener( 'animationend', () => { remove_el( el ) } )

  }

}