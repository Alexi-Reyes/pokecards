import { Observer } from '@/types';

export class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
        return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
        return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
  }

  notify(event: string, data?: any): void {
    console.log('Subject: Notifying observers...');
    for (const observer of this.observers) {
        observer.update(event, data);
    }
  }
}
