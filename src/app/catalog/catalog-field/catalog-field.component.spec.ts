import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogFieldComponent } from './catalog-field.component';

describe('CatalogFieldComponent', () => {
  let component: CatalogFieldComponent;
  let fixture: ComponentFixture<CatalogFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
