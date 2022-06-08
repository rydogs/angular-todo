import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: Item = {
    id: '',
    text: '',
    done: false
  }
  @Output() removeEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  remove(): void {
    this.removeEvent.emit(this.item?.id);
  }
}
