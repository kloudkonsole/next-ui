import pico from 'pico-common'

function ajax(method, url, params, opt, cb, userData){
	cb=cb || function(err){
		if(err)console.error(err)
	}
	if (!url) return cb('url not defined')
	method = method.toUpperCase()
	params=params||{}
	opt=opt||{}

	var xhr = new XMLHttpRequest()
	var useBody = null == opt.useBody ? 'GET' !== method : opt.useBody
	var useURL = null == opt.useURL ? !useBody : opt.useURL
	var dataType = (params.charAt ? 1 : (params instanceof FormData ? 3 : 2))

	url = encodeURI(url)

	if (useBody){
		if (2===dataType) params=JSON.stringify(params)
	}
	if (useURL){
		url += (-1===url.indexOf('?')?'?':'&')+'appVer='+__.env.appVer||0
		if (params){
			url += '&'
			switch(dataType){
			case 1: url += encodeURIComponent(params); break
			case 2: url += __.querystring(params); break
			case 3: return cb('FormData with GET method is not supported yet')
			}
			params = null
		}
	}

	xhr.open(method, url, !opt.sync, opt.un, opt.passwd)

	xhr.timeout=opt.timeout||0
	xhr.responseType=opt.responseType||''

	xhr.onreadystatechange=function(){
		if (1 < xhr.readyState){
			var st = xhr.status, loc
			if (st>=300 && st<400 && (loc=xhr.getResponseHeader('location'))) return __.ajax(method,loc,params,opt,cb,userData)
			xhr.onerror=void 0 // debounce for cors error
			return cb(
				// webkit st === 0 when get from local
				(300>st || (!st && xhr.response)) ? null : {error:xhr.statusText,code:st},
				xhr.readyState,
				xhr.response,
				userData)
		}
	}
	xhr.ontimeout=xhr.onerror=function(evt){
		cb({error:xhr.statusText,code:xhr.status,src:evt,params:arguments}, xhr.readyState, null, userData)
	}
	var ct='Content-Type'
	var h=opt.headers
	// never set Content-Type, it will trigger preflight options and chrome 35 has problem with json type
	//if (useBody && params && 2 === dataType) xhr.setRequestHeader('Content-Type', 'application/json')
	if (useBody && (!h || !h[ct]) && params){
		switch(dataType){
		case 1:
		case 2: xhr.setRequestHeader(ct, 'text/plain'); break
		case 3: xhr.setRequestHeader(ct, 'multipart/form-data'); break
		}
	}
	for (var k in h) xhr.setRequestHeader(k, h[k])

	xhr.send(params)
	return xhr
}

pico.run({
    name: 'stub-ui',
    ajax,
    paths: {
        '@': 'https://kloudkonsole.com/next-eg/'
    },
}, () => {
    const service = pico.export('@/models/sku')

    return function(){
		console.log('*********', service)
    }
})

const proSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#2db7f5',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Stub UI',
  pwa: false,
  iconfontUrl: '',
};
export default proSettings;
