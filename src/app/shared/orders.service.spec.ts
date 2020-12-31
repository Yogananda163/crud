import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(() => {
    const angularFirestoreStub = () => ({
      collection: string => ({
        add: () => ({ then: () => ({}) }),
        snapshotChanges: () => ({}),
        doc: () => ({ set: () => ({}), delete: () => ({}) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        OrdersService,
        { provide: AngularFirestore, useFactory: angularFirestoreStub }
      ]
    });
    service = TestBed.inject(OrdersService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getCoffeeOrders', () => {
    it('makes expected calls', () => {
      const angularFirestoreStub: AngularFirestore = TestBed.inject(
        AngularFirestore
      );
      spyOn(angularFirestoreStub, 'collection').and.callThrough();
      service.getCoffeeOrders();
      expect(angularFirestoreStub.collection).toHaveBeenCalled();
    });
  });
});
