import {LogSeverity} from "./LogSeverity";

export default class LogEntity {
  private readonly _timestamp: Date;
  private readonly _severity: LogSeverity;
  private readonly _domain: string;
  private readonly _text: string;

  constructor(timestamp: Date, domain: string, severity: LogSeverity, text: string) {
    this._timestamp = timestamp;
    this._severity = severity;
    this._domain = domain;
    this._text = text;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get severity(): LogSeverity {
    return this._severity;
  }

  get domain(): string {
    return this._domain;
  }

  get text(): string {
    return this._text;
  }

  public toString(): string {
    return `${this._timestamp.toISOString()} (${LogSeverity[this._severity]}): ${this._text}`;
  }
}