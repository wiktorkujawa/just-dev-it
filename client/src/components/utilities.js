// Function to calculate image lightness
export const getImageLightness = (imageSrc,callback) => {
  const img = document.createElement("img");
  img.src = imageSrc;
  img.setAttribute('crossOrigin', '');
  document.body.appendChild(img);

  let colorSum = 0;
  img.onload = function() {
      // create canvas
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(this,0,0);

      const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      const data = imageData.data;
      let r,g,b,avg;

      for(let x = 0, len = data.length; x < len; x+=4) {
          r = data[x];
          g = data[x+1];
          b = data[x+2];

          avg = Math.floor((r+g+b)/3);
          colorSum += avg;
      }
      const brightness = Math.floor(colorSum / (this.width*this.height));
      callback(brightness);
  }
  document.body.removeChild(img);
}


export const formatDate = (unformattedDate) =>{
  const date = new Date(parseInt(unformattedDate));
  const currentDate = new Date();

  const timeDifference = Math.floor((currentDate.getTime() - date.getTime())/1000); 

  if(timeDifference<60) return `${timeDifference} secs ago`

  if(timeDifference<3600){
    const minuteDifference = Math.floor((currentDate.getTime() - date.getTime())/60000);
    if(minuteDifference===1)
    {
      return `${minuteDifference} min ago`
    }
    return `${minuteDifference} mins ago`
  }

  if(timeDifference<86400){
    const hourDifference = Math.floor((currentDate.getTime() - date.getTime())/3600000);
    if(hourDifference===1)
    {
      return `${hourDifference} hour ago`
    }
    return `${hourDifference} hours ago` 
  }

  if(timeDifference<604800){
    const daysDifference = Math.floor((currentDate.getTime() - date.getTime())/86400000);
    if(daysDifference===1)
    {
      return `yesterday`
    }
    return `${daysDifference} days ago` 
  }

  else {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    // const month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1).toString() : date.getMonth() + 1 ;
    // const day = date.getDate() <10 ? '0'+date.getDate().toString() : date.getDate();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month} ${day} '${year-2000} at ${hours}:${minutes}`
  }
}