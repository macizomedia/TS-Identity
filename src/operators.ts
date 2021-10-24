interface Field {
  key?: string;
  property?: string;
}

const addOrUpdateField = (field: Field, fields: Array<Field>): Array<Field> => {
  const index = fields.findIndex((f: Field) => field.key === f.key);

  if (-1 === index) {
    return [...fields, field];
  }

  return [...fields.slice(0, index), field, ...fields.slice(index + 1)];
};

const removeField = (fieldId: string, fields: Array<Field>): Array<Field> => {
  const index = fields.findIndex((f: Field) => fieldId === f.key);
  if (-1 === index) {
    return fields;
  }
  return [...fields.slice(0, index), ...fields.slice(index + 1)];
};

abstract class Command<State> {
  abstract execute(state: State, newValue?: any): State;
  abstract undo(state: State, index?: any): State;
}

class CommandStack<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  execute(command: Command<State>, newValue: any) {
    this._state = command.execute(this._state, newValue);
    this.stack.push(command);
  }

  undo(index:any) {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state, index);
    }
  }
}

export class AddToArray extends Command<Field[]> {
  execute(state: Field[], value: Field) {
    return addOrUpdateField(value, state);
  }
  undo(state: Field[], value: string) {
    return removeField(value, state);
  }
}

/* class SetValue extends Command<number> {
  private _originalValue?: number;
  constructor(private value: number) {
    super();
  }
  execute(state: number) {
    this._originalValue = state;
    return this.value;
  }
  undo(state: number) {
    return this._originalValue!;
  }
}
 */
export const cs = new CommandStack<Field[]>([])