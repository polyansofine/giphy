function searchApi(props){
      let url = `https://api.giphy.com/v1/gifs/search?api_key=9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7&q=${props}&limit=21`;
      const foo = async () => {
            let response = await fetch(url);
            let gifs = await response.json();

            return gifs;
          }
      //  fetch(url)
      //       .then(response => response.json()).then(gifLinks => {
      //           console.log(gifLinks.data.url);
      //           dataUrl = gifLinks.data.url;
      //       })
      // console.log(dataUrl)
      return foo()
}

export default searchApi;