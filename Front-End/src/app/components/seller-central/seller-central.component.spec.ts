import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCentralComponent } from './seller-central.component';

describe('SellerCentralComponent', () => {
  let component: SellerCentralComponent;
  let fixture: ComponentFixture<SellerCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerCentralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
