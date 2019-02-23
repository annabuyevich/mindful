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
          if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                  this.video.nativeElement.srcObject = stream;
                  this.video.nativeElement.play();
              });
          }
      }

      public capture() {
          var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
          this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
        //  console.log(this.captures[0]);

          $.ajax({
            type: "POST",
            url:'../../assets/emotionDetection.py',
            data: {img: this.capture[0]},
            success: function() {
              console.log("success");
            },
            error: function(xhr,error){
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
