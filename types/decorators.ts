/**
 * A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
 */

/// Decorator Fctory
type TDecorator<T> = (value: T) => (target: T) => void;
function color(value: string) {
  return (target: string) => {};
}

function second(value:string) {
  return function (target: number) {};
}


class ExampleDecoratorStream {
    @color(),
    @second()
}

/**
 *  Decorator Evaluator
 * This is a well defined order to how decorators applied to various declarations inside of a class. 
 * Methods Decorators, Classes Decorators,Ancestor Declarators, Property Declarators, Parameter Declarators
 * Class Declarators -->  is declared before a class decorator
 */

/// CLASS DECLARATORS

class BugReport {
    type= "report";
    title: string
    constructor (t: string) {
        this.title = t
    }
}

function sealed(constructor: Function) {
    Object.seal(constructor)
    Object.seal(constructor.prototype) // Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
}

function reportableClassDecorator <T extends {new (...args: any[]): {}}>(constructor: T){
    return class extends constructor{
        reportUrl = ""
    }
} 

@reportableClassDecorator;

class deriveDebug {
    type: string;
    title: number
    constructor (t:number, reportVALUES: string) {
        this.type = "hello";
        this.title = t
    }
}


///  METHODS DECCORATORS -- delcared just before a method delaration
// The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition

class Greeter{
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    @enumerable(false)
}

function enumerable (value: boolean){
    return function (target:any, propertyKey: string, descriptor: PropertyDescriptor){
        descriptor.enumerable = value
    }
}