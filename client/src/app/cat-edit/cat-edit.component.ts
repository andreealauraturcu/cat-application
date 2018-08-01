import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../shared/cat/cat.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css']
})
export class CatEditComponent implements OnInit, OnDestroy {
  cat: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private catService: CatService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.catService.get(id).subscribe((cat: any) => {
          if (cat) {
            this.cat = cat;
            this.cat.href = cat._links.self.href;
            this.giphyService.get(cat.name).subscribe(url => cat.giphyUrl = url);
          } else {
            console.log(`Cat with id '${id}' was not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/cat-list']);
  }

  save(form: NgForm) {
    this.catService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.catService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
