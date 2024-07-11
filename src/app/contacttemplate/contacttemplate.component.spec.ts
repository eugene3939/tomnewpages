import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacttemplateComponent } from './contacttemplate.component';

describe('ContacttemplateComponent', () => {
  let component: ContacttemplateComponent;
  let fixture: ComponentFixture<ContacttemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContacttemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContacttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
