import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public callAlg(myVar) {
    console.log("in here");
    var txt_data = (document.getElementById("journal") as HTMLTextAreaElement).value;
    console.log(txt_data);
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:5000/journal',
      data: { text: txt_data },
      success: function (msg) {
        console.log("success");
        console.log(msg);
        var div_result = document.getElementById('result');
        var result = '<div class="alert alert-info" role="alert">The text displayed <a href="/activity">' + msg;
        result += '</a> Sentiment</div>';
        div_result.innerHTML = result;

      },
      error: function (xhr, error) {
        console.log(xhr.responseText);
      }
    });
  }
}
