import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellWithAmazonComponent } from './sell-with-amazon.component';

describe('SellWithAmazonComponent', () => {
  let component: SellWithAmazonComponent;
  let fixture: ComponentFixture<SellWithAmazonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellWithAmazonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellWithAmazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
