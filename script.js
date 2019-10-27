document.addEventListener('DOMContentLoaded', function toggle () {


  let canvas = document.getElementById('canvas');
  let size4x4 = document.getElementById('size-4x4');
  let size32x32 = document.getElementById('size-32x32');
  let sizeImg = document.getElementById('size-img');


  size4x4.addEventListener('mousedown', async () => {
    let arr = await getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json');
    await draw(arr, 'hex');
  });

  size32x32.addEventListener('mousedown', async () => {
    let arr = await getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json');
    await draw(arr, 'rgb');
  });

  sizeImg.addEventListener('mousedown', async () => {
    let path = './assets/images/image.png';
    getImg(path);
  });


  const getArr = (url) => fetch(url).then(response => response.json()).then(data => {
      let arr = [];
      data.forEach(x => {
        x.forEach(x => arr.push(x))
      })
      return arr;
    })


  const draw = (arr, method) => {
    let w = canvas.getBoundingClientRect().width / Math.sqrt(arr.length);
    let ctx = canvas.getContext('2d');
    let x = 0;
    let y = 0;

    arr.forEach(v => {
      if (method == 'rgb') {
        ctx.fillStyle = `rgb(${v[0]},${v[1]},${v[2]})`;
      }

      else if (method == 'hex') {
        ctx.fillStyle = `#${v}`;
      }

      ctx.fillRect(x, y, w, w);
      x += w;

      if (x == canvas.getBoundingClientRect().width) {
        x = 0;
        y += w;
      }

    });

  }

  const getImg = (path) => {
    let img = new Image(),
    ctx = canvas.getContext('2d');
    img.src = path;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 512);
    }
  }
});
