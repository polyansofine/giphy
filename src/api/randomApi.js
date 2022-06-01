function randomApi(){
      let url = "https://api.giphy.com/v1/gifs/random?api_key=9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7";
      const foo = async () => {
            let response = await fetch(url);
            let gifLink = await response.json();
            return ({url: gifLink.data.images.fixed_height.url, title: gifLink.data.title, realUrl:gifLink.data.url});
          }
      //  fetch(url)
      //       .then(response => response.json()).then(gifLinks => {
      //           console.log(gifLinks.data.url);
      //           dataUrl = gifLinks.data.url;
      //       })
      // console.log(dataUrl)
      return foo()
}

export default randomApi;