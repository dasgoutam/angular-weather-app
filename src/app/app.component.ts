import { Component, VERSION, OnInit } from "@angular/core";
import { interval, Observable, Observer, fromEvent, merge, async } from "rxjs";
import { mergeMap, startWith, map } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  cards = ["one", "two", "three", "one", "two", "three", "one", "two", "three"];

  isOfflineMode: boolean;

  constructor() {
    this.isOnline().then(data => {
      this.isOfflineMode = !data;
    });
  }

  ngOnInit() {}

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, "offline").pipe(map(() => false)),
      fromEvent(window, "online").pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  getRandomString() {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  }

  async isOnline() {
    if (!window.navigator.onLine) return false;

    // avoid CORS errors with a request to your own origin
    const url = new URL(window.location.origin);

    // random value to prevent cached responses
    url.searchParams.set("rand", this.getRandomString());

    try {
      const response = await fetch(url.toString(), { method: "HEAD" });

      return response.ok;
    } catch {
      return false;
    }
  }
}
