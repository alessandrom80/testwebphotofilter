import { Component } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedFilter = '';
  selectedIndex = 0;
  result: HTMLElement;
 
  image: any = '';

  slideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 5,
    slidesOffsetBefore: 20,
    freeMode: true
  };

  filterOptions = [
    { name: 'Normal', value: '' },
    { name: 'Sepia', value: 'sepia' },
    { name: 'Blue Monotone', value: 'blue_monotone' },
    { name: 'Violent Tomato', value: 'violent_tomato' },
    { name: 'Grey', value: 'greyscale' },
    { name: 'Brightness', value: 'brightness' },
    { name: 'Saturation', value: 'saturation' },
    { name: 'Contrast', value: 'contrast' },
    { name: 'Hue', value: 'hue' },
    { name: 'Cookie', value: 'cookie' },
    { name: 'Vintage', value: 'vintage' },
    { name: 'Koda', value: 'koda' },
    { name: 'Technicolor', value: 'technicolor' },
    { name: 'Polaroid', value: 'polaroid' },
    { name: 'Bgr', value: 'bgr' }
  ];
 
  constructor() {}
 
  async selectImage() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.image = image.dataUrl;
  }
 
  filter(index) {
    this.selectedFilter = this.filterOptions[index].value;
    this.selectedIndex = index;
  }
 
  imageLoaded(e) {
    // Grab a reference to the canvas/image
    this.result = e.detail.result;
  }
 
  saveImage() {
    let base64 = '';
    if (!this.selectedFilter) {
      // Use the original image!
      base64 = this.image;
    } else {
      let canvas = this.result as HTMLCanvasElement;
      // export as dataUrl or Blob!
      base64 = canvas.toDataURL('image/jpeg', 1.0);
    }
 
    // Do whatever you want with the result, e.g. download on desktop
    this.downloadBase64File(base64);
  }
 
  // https://stackoverflow.com/questions/16996319/javascript-save-base64-string-as-file
  downloadBase64File(base64) {
    const linkSource = `${base64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
 
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'test.png';
    downloadLink.click();
  }

}
