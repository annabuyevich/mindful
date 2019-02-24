import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
//import * as emotion_detection from '../../assets/emotionDetection.py'
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  //    declare var require: any;
  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<"image">;

  public constructor() {
    this.captures = [];
  }

  public ngOnInit() {

  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    //     var scratchCanvas = document.createElement('canvas');
    // var context = scratchCanvas.getContext('2d');
    // context.putImageData(...);
    // var dataURL = scratchCanvas.toDataURL();
    //  console.log(this.captures[0]);
    var image = this.captures[0].split(',')
    var online_image = "https://i.ndtvimg.com/i/2016-06/facial-yoga-625_625x350_71465456289.jpg";
    console.log(image[1]);

    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:5000/post',
      data: { img: image[1] },
      success: function (msg) {

        console.log(msg);
        //window.location.reload();
        var result = '<div class="alert alert-info" role="alert"> You have been detected as ' + msg;
        result += '</div>';
        var div = document.getElementById('result');
        // div.style.removeProperty('background');
        // div.style.removeProperty('border-color');
        div.innerHTML = result;

      },
      error: function (xhr, error) {
        console.log(xhr.responseText);
      }
    });
    //      emotion_detection.detectEmotion(this.captures[0]);
    /*var emodtion_detection = '../assets/emotionDetection.py';
    var  PythonShell = require('python-shell');
    var options = {
        args: this.captures[0]
    };
    PythonShell.run('../assets/emotionDetection.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });*/
  }

}
