import { FormArray, FormGroup } from '@angular/forms';

/**
 * checks if a reactive form control group was created according to model;
 * @param model a one level deep object
 * @param formGroup the form group that should resemble the model
 * @param propsToCheck optional a list of model properties to check
 * @param expect jasmine expect function
 */
function compareModelToFormGroup(
  model: { [key: string]: any },
  formGroup: FormGroup,
  propsToCheck: string[] = Object.keys(model),
  expect
): void {
  propsToCheck.forEach(propName => {
    expect(formGroup.get(propName).value).toEqual(model[propName]);
  });
}

function compareModelToFormArray(
  model: any[],
  formArray: FormArray,
  expect
): void {
  model.forEach((value, index) => {
    expect(formArray.at(index).value).toEqual(value);
  });
}

export const appTestUtils = {
  compareModelToFormGroup,
  compareModelToFormArray
};
