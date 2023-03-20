/// UTILITTY TYPES DECLARATINS

type A = Awaited<Promise<string>>;

type B = Awaited<Promise<Promise<number>>>;

type C = Awaited<number | Promise<number>>;

///// Constructs a type of properties of Tyoe set to strict Mode. This utility will return a type that represens all subsets of a give value

interface Types {
  title: string;
  description: string;
}

const updatePost = (post: Types, newPost: Partial<Types>) => {
  return { ...post, ...newPost };
};

const post1 = {
  title: "read",
  description: "read typescrit ",
};

const post2 = updatePost(post1, { description: "Hello World " });
console.log("Response", post2);

// REQUIRED Construct a type consisting of all types relating to Type set to required

interface Props {
  a?: string;
  b?: number;
}

const Prop1: Props = { a: " wilson" };
//// Throws error
// const Prop2: Required<Props> = { a: "wilson" };

// Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.

interface Todo {
  name: string;
  readonly timestamp: number;
}

const todo: Readonly<Todo> = {
  name: "wilson",
  timestamp: 4,
};
/// thorwss an error
// todo.title = "wilson";

/** Record<Keys, Type>
Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type. */

interface BirdsFeature {
  canFly: Boolean;
  voice: string;
}

type BirdName = "snack" | "Dogs" | "Horse";

const birds: Record<BirdName, BirdsFeature> = {
  snack: { canFly: true, voice: "" },
  Dogs: { canFly: true, voice: "" },
  Horse: { canFly: true, voice: "" },
};

type Extra<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * Pick<Type, Keys>
Released:
2.1

Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
 */

interface Todo2 {
  title: string;
  des: string;
  done: boolean;
}

type TodoPreview = Pick<Todo2, "title" | "done">;

const todo3: TodoPreview = {
  title: "",
  done: true,
};

/**
 * Omit<Type, Keys>
Released:
3.5

Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
 */

interface Type3 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview2 = Omit<Type3, "title" | "description">;

const todocard: TodoPreview2 = {
  completed: true,
  createdAt: 3,
};

/**
 * Exclude<UnionType, ExcludedMembers>
Released:
2.8

Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers
 */

type T0 = Exclude<"a" | "b" | "c", "a">;
type T2 = Exclude<string | number | (() => void), Function>;

/**
 * Extract<Type, Union>
Released:
2.8

Constructs a type by extracting from Type all union members that are assignable to Union
 */

type T3 = Extract<string | (() => void), Function>;

/**
 * NonNullable<Type>
Released:
2.8

Constructs a type by excluding null and undefined from Type.
 */

type T4 = NonNullable<string | number | null | undefined>;

/**
 * Parameters<Type>
Released:
3.1

Constructs a tuple type from the types used in the parameters of a function type Type.
 */
interface TArgs {
  a: string;
  b: string;
}
declare function f1(args: TArgs): void;
type T6 = Parameters<() => string>;
type T7 = Parameters<<T>(args: T) => string>;

/**
 * ConstructorParameters<Type>
Released:
3.1

Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function).
 */

type T9 = ConstructorParameters<ErrorConstructor>;
type T10 = ConstructorParameters<RegExpConstructor>;

/**
 * ReturnType<Type>
Released:
2.8

Constructs a type consisting of the return type of function Type.
 */
declare function f2(): TArgs;
type T12 = ReturnType<<T extends U, U extends number[]>() => T>;
type T13 = ReturnType<() => number>;

/**
 * InstanceType<Type>
Released:
2.8

Constructs a type consisting of the instance type of a constructor function in Type.s
 */

class CC {
  a = 0;
}

type T14 = InstanceType<typeof CC>;

/**
 * ThisParameterType<Type>
Released:
3.3

Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter.
 */

function tohex(this: number) {
  return this.toString();
}

function numberString(n: ThisParameterType<typeof tohex>) {
  return tohex.apply(n);
}

console.log(numberString);

/**
 * OmitThisParameter<Type>
Released:
3.3

Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type.

Example
 */

function tohex2(this: number) {
  return this.toString(20);
}

const fiveHex: OmitThisParameter<typeof tohex2> = tohex2.bind(10);
console.log(fiveHex());

/**
 * ThisType<Type>
Released:
2.3

This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.
 */

// @noimplict: false
type ObjectDescriptor<B, C> = {
  data?: B;
  methods?: B & ThisType<B & C>;
};

function makeObj<M, D>(desc: ObjectDescriptor<D, M>) {
  const { data, methods } = desc;
  let data2: object = data || {};
  let method: object = methods || {};
  return { ...data2, ...method } as M & D;
}

let obj3 = makeObj({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    },
  },
});

/// So damn good, built with stable diffusion aka AI
type TConstr = (_name: string, _age: number, ...others: any) => any;
class Generic<T> {
  // let numeric: string
  constructor(_name: string, _age: number) {
    let name = _name;
  }
}
type TFootballers = [number, string, Boolean, number, string];
const namesOfFootballers: TFootballers = [2, "wilson", true, 2, "dk"];
let listCollections = [] + namesOfFootballers + "wilson".split;
for (var i = 0; i < listCollections; i++) {
  if (listCollections[i] === "wilson") {
    listCollections[i].slice(i, 0);
  }
  if (typeof listCollections[i] == "string") null;
  listCollections;
}

console.log(listCollections);
