import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../common/local-storage.service';
import { Item } from './item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() items: Array<Item>
  newItem: string = ""

  localStorageService: LocalStorageService
  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService
    let saved = localStorageService.getItem("todoItems")
    if (saved) {
      this.items = JSON.parse(saved)
    } else {
      this.items = [];
    }
  }

  ngOnInit(): void {
    window.onbeforeunload = () => this.save()
  }

  addItem(): void {
    if (this.newItem) {
      this.items.push({
        id: (this.items.length || 0).toString(),
        text: this.newItem,
        done: false
      })
      this.newItem = ""
    }
  }

  markDone(id: String): void {
    this.items.filter(e => e.id === id).forEach(e => e.done = true)
  }

  save(): void {
    this.localStorageService.setItem("todoItems", JSON.stringify(this.items))
  }

  clear(): void {
    this.localStorageService.clear()
    this.items = []
  }
}