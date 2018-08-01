import { Component, OnInit } from '@angular/core';
import { CatService } from '../shared/cat/cat.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {
  cats: Array<any>;

  constructor(private catService: CatService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.catService.getAll().subscribe(data => {
      this.cats = data;
      for (const cat of this.cats) {
        this.giphyService.get(cat.name).subscribe(url => cat.giphyUrl = url);
      }
    });
  }
}
