{
    console.log('calculate padded minimal viewBox')
    padding = 0.5
    //
    const $svg = document.querySelector('svg')
    const {x,y,width,height} = $svg.getBBox()
    const max = Math.max(width - x, height - y)
    let dw = max - (width - x)
    let dh = max - (height - y)
    let nx = x - (dw / 2)
    let nw = width + dw
    let ny = y - (dh / 2)
    let nh = height + dh
    const viewBox = [
        nx - padding,
        ny - padding,
        nw + padding * 2,
        nh + padding * 2,
    ].join(' ')
    //
    console.log(viewBox)
    //$svg.setAttribute('viewBox', viewBox)
}
