import {
  CanDeactivateFn
} from '@angular/router';

export interface CanLeavePage {
  canLeavePage(): boolean;
}

export const unsavedChangesGuard:
  CanDeactivateFn<CanLeavePage> =
  component => {

    return component.canLeavePage();
  };
