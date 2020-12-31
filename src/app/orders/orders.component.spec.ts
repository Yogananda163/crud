import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(() => {
    const ordersServiceStub = () => ({
      form: { value: { coffeeOrder: {} } },
      createCoffeeOrder: data => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OrdersComponent],
      providers: [{ provide: OrdersService, useFactory: ordersServiceStub }]
    });
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`coffees has default value`, () => {
    expect(component.coffees).toEqual([
      `Americano`,
      `Flat White`,
      `Cappuccino`,
      `Latte`,
      `Espresso`,
      `Machiato`,
      `Mocha`,
      `Hot Chocolate`,
      `Tea`
    ]);
  });

  it(`coffeeOrder has default value`, () => {
    expect(component.coffeeOrder).toEqual([]);
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const ordersServiceStub: OrdersService = fixture.debugElement.injector.get(
        OrdersService
      );
      spyOn(ordersServiceStub, 'createCoffeeOrder').and.callThrough();
      component.onSubmit();
      expect(ordersServiceStub.createCoffeeOrder).toHaveBeenCalled();
    });
  });
});
