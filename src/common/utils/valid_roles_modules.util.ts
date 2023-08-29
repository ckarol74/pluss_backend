export class ValidRolesModules {
  static IsValid(roleModule: Array<string>, userRoles: Array<string>) {
    let isValidModule = false;
    roleModule.forEach((role) => {
      if (userRoles.includes(role)) isValidModule = true;
    });
    return isValidModule;
  }
}
