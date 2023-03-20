/**
 * A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
 */

/// Decorator Fctory
import { performance } from "perf_hooks";
import "reflect-metadata";
type TDecorator<T> = (value: T) => (target: T) => void;
function color(value: string) {
  return (target: string) => {};
}

function second(value: string) {
  return function (target: number) {};
}

class ExampleDecoratorStream {
  // @color(),
  // @second()
}

/**
 *  Decorator Evaluator
 * This is a well defined order to how decorators applied to various declarations inside of a class.
 * Methods Decorators, Classes Decorators,Ancestor Declarators, Property Declarators, Parameter Declarators
 * Class Declarators -->  is declared before a class decorator
 */

/// CLASS DECLARATORS

class BugReport {
  type = "report";
  title: string;
  constructor(t: string) {
    this.title = t;
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype); // Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
}

function reportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    reportUrl = "";
  };
}

class deriveDebug {
  type: string;
  title: number;
  constructor(t: number, reportVALUES: string) {
    this.type = "hello";
    this.title = t;
  }
}

///  METHODS DECCORATORS -- delcared just before a method delaration
// The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition

function enumerables(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
class Greeters {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  @enumerable(false)
  greet() {
    return `fkfkkkf`;
  }
}

// Accessors dECORATORS -------------------------------- This is declared before an ancestor declaration. It is applied to the Property Descriptor for the accessors and can be used to observe, modify, or replace a accessor definitions.

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  @configurable(false)
  get x() {
    return this._x;
  }
  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

// PROPERTY DECORATORS


const formatMetadataKey = Symbol("format");
function format(formatString: string){
    return Reflect.metadata(formatMetadataKey, formatString)
}
function getFormat(formatString: string, target: any){
    return Reflect.getMetadata(formatMetadataKey, target, formatString)
}


class Greeter {
  @format("hELLO, %S")
  greeting: string;

  constructor(greet: string) {
    this.greeting = greet;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("", this.greeting);
  }
}

function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}


// PROPERTY DEDORATOR

const requiredMetadataKey = Symbol("required");
 
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;
 
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}

function important (target: Object, propertyKey: string | symbol, parameterIndex: number){
    let existingRequiredParamter: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParamter.push(parameterIndex)
    Reflect.defineMetadata(requiredMetadataKey,existingRequiredParamter, target, propertyKey)
}

function newreportableClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    __timing = [];
  };
}


function timing() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const value = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      const start = performance.now();
      const output = await value.apply(this as string, args);
      const end = performance.now();
      if ((this as { __timing: unknown[] }).__timing) {
        (this as { __timing: unknown[] }).__timing.push({
          method: propertyKey,
          duration: end - start,
        });
      } else {
      }
      console.log(end - start);
      return output;
    };
  };
}

const delay = <T>(time: number, data: T) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );
@newreportableClassDecorator
class Users {
  private __timings(__timings: any) {
    throw new Error("Method not implemented.");
  }
  @timing()
  async getUsers() {
    return delay( 2000, []);
  }
  @timing()
  async getUser(id: number) {
    return delay(1000, {@important id: `user:${id}` });
  }
}
(async function () {
  const users = new Users();

  await users.getUser(3);
  await users.getUsers();
  console.log(users.__timing);
})();
