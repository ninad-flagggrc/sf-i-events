
const validateName = (name: string) => {
    if((name + "").length > 2) {
      return true;
    }
    return false;
  }

  function createDiagonalPattern1(color: string) {
    // create a 10x10 px canvas for the pattern's base shape
    let shape = document.createElement('canvas')
    shape.width = 10
    shape.height = 10
    // get the context for drawing
    let c = shape.getContext('2d')
    // draw 1st line of the shape 
    c!.strokeStyle = color
    c!.lineWidth = 3
    c!.beginPath()
    c!.moveTo(2, 0)
    c!.lineTo(10, 8)
    c!.stroke()
    // draw 2nd line of the shape 
    c!.beginPath()
    c!.moveTo(2, 10)
    c!.lineTo(0, 8)
    c!.stroke()
    // create the pattern from the shape
    return c!.createPattern(shape, 'repeat')
  }

  // function createDiagonalPattern2(color: string) {
  //   let shape = document.createElement('canvas')
  //   shape.width = 10
  //   shape.height = 10
  //   // get the context for drawing
  //   let c = shape.getContext('2d')
  //   // draw 1st line of the shape 
  //   c!.beginPath();
  //   c!.rect(2, 2, 8, 8)
  //   c!.fillStyle = color;
  //   c!.fill();
  //   // create the pattern from the shape
  //   return c!.createPattern(shape, 'repeat')
  // }

  function createDiagonalPattern2(color: string) {
    // create a 10x10 px canvas for the pattern's base shape
    let shape = document.createElement('canvas')
    shape.width = 10
    shape.height = 10
    // get the context for drawing
    let c = shape.getContext('2d')
    // draw 1st line of the shape 
    c!.beginPath();
    c!.rect(1, 1, 9, 9)
    c!.fillStyle = color;
    c!.fill();
    c!.lineWidth = 1;
    c!.strokeStyle = color;
    c!.stroke();
    // create the pattern from the shape

    // create tick

    //draw tick
    c!.beginPath();
    c!.moveTo(2,2);
    c!.lineTo(8,8);
    c!.moveTo(2,8);
    c!.lineTo(8,2);
    c!.lineWidth = 2;
    c!.strokeStyle = '#fff';
    c!.stroke();

    return c!.createPattern(shape, 'repeat')
  }

  function createDiagonalPattern3(color: string) {
    // create a 10x10 px canvas for the pattern's base shape
    let shape = document.createElement('canvas')
    shape.width = 10
    shape.height = 10
    // get the context for drawing
    let c = shape.getContext('2d')
    // draw 1st line of the shape 
    c!.beginPath();
    c!.rect(1, 1, 9, 9)
    c!.fillStyle = color;
    c!.fill();
    c!.lineWidth = 1;
    c!.strokeStyle = color;
    c!.stroke();
    // create the pattern from the shape

    // create tick

    //draw tick
    c!.beginPath();
    c!.moveTo(2,5);
    c!.lineTo(4,7);
    c!.lineTo(8,2);
    c!.lineWidth = 2;
    c!.strokeStyle = '#fff';
    c!.stroke();

    return c!.createPattern(shape, 'repeat')
  }

  // function createDiagonalPattern3(color: string) {
  //   // create a 10x10 px canvas for the pattern's base shape
  //   let shape = document.createElement('canvas')
  //   shape.width = 14
  //   shape.height = 14
  //   // get the context for drawing
  //   let c = shape.getContext('2d')
  //   // draw 1st line of the shape 
  //   c!.beginPath();
  //   c!.arc(7, 7, 6, 0, 2 * Math.PI, false);
  //   c!.fillStyle = color;
  //   c!.fill();
  //   c!.lineWidth = 1;
  //   c!.strokeStyle = color;
  //   c!.stroke();
  //   // create the pattern from the shape

  //   // create tick

  //   //draw tick
  //   c!.beginPath();
  //   c!.moveTo(4,6);
  //   c!.lineTo(6,9);
  //   c!.lineTo(10,4);
  //   c!.lineWidth = 2;
  //   c!.strokeStyle = '#fff';
  //   c!.stroke();

  //   return c!.createPattern(shape, 'repeat')
  // }

  // function createDiagonalPattern3(color: string) {
  //   // create a 10x10 px canvas for the pattern's base shape
  //   let shape = document.createElement('canvas')
  //   shape.width = 10
  //   shape.height = 10
  //   // get the context for drawing
  //   let c = shape.getContext('2d')
  //   // draw 1st line of the shape 
  //   c!.beginPath();
  //   c!.arc(5, 5, 4, 0, 2 * Math.PI, false);
  //   c!.fillStyle = color;
  //   c!.fill();
  //   c!.lineWidth = 1;
  //   c!.strokeStyle = color;
  //   c!.stroke();
  //   // create the pattern from the shape
  //   return c!.createPattern(shape, 'repeat')
  // }

  const timeSince = (date: number) => {

    var seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }


function readCookie(key: string) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function callApi(url: string, data: string, authorization: any) {

    return new Promise((resolve: any) => {

        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if(xhr != null) {
                if(xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        if(authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);

        return xhr;

    })

}

const exportFunctions = {
   callApi, validateName, readCookie, timeSince, createDiagonalPattern1, createDiagonalPattern2, createDiagonalPattern3
};

export default exportFunctions;