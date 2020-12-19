import { Component, VERSION, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  cards = ["one", "two", "three", "one", "two", "three", "one", "two", "three"];

  ngOnInit() {}
}
