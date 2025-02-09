import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gift.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(private gifsService: GifsService){  }

  get tagHistory(){
    return this.gifsService.tagsHistory
  }

  searchBtnTag(tag:string): void{

    this.gifsService.searchTag(tag);
  }
}
