import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('verify save if form is valid', ()=>{
    spyOn(component, "userFormValid").and.returnValue(true);

    component.errorMessage = 'error message';
    component.validForm = true;
    component.save();

    expect(component.errorMessage).toBe("");
    expect(component.validForm).toBeTruthy();
  })
  it('verify save user if the form is not valid', ()=>{
    spyOn(component, "userFormValid").and.returnValue(false);

    component.errorMessage = 'error message';
    component.validForm = false;

    expect(component.errorMessage).toBe('');
    expect(component.validForm).toBeFalsy()
  })
});
