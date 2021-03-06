import * as path from "path";
import * as vscode from "vscode";
import { StorageItem } from "./storage";

export class ExtensionManager {
  private static _context: vscode.ExtensionContext;
  private static _storageItems: StorageItem<any>[] = [];

  /**
   * Initialize the ExtensionManager.
   *
   * @param context The ExtensionContext to use.
   */
  static initialize(context: vscode.ExtensionContext) {
    this._context = context;
  }

  /**
   * Get a workspace configuration object by passing its section key.
   *
   * @param section The section key to use when retrieving the item.
   * @param defaultValue The value to use when section can't be found.
   */
  static getConfigurationItem<T>(section: string, defaultValue: T): T {
    return vscode.workspace.getConfiguration("exercism").get<T>(section, defaultValue);
  }

  /**
   * Get the absolute URI of a resource contained within the extension's installation
   * directory by passing its relative path.
   *
   * @param relativePath The path of a resource relative to the installation directory.
   * @example ExtensionManager.getAbsolutePathURI("images/logo/logo.svg")
   */
  static getAbsolutePathURI(relativePath: string): vscode.Uri {
    return vscode.Uri.file(path.join(this._context.extensionPath, relativePath));
  }

  /**
   * Get the directory path of the global storage.
   */
  static getGlobalStorageDir(): string {
    return path.dirname(this._context.globalStoragePath);
  }

  /**
   * Update or add a key/value pair to the global storage.
   *
   * @param key The key to update.
   * @param value The replacement value.
   */
  static updateGlobalStorage(key: string, value: any): void {
    this._context.globalState.update(key, value);
  }

  /**
   * Retrieve a value at the given key from the global storage.
   *
   * @param key The key to use when retrieving a value.
   * @param defaultValue The value to use when there is no existing value.
   */
  static getFromGlobalStorage<T>(key: string, defaultValue: T): T {
    return this._context.globalState.get(key, defaultValue);
  }

  /**
   * Subscribe the extension to the given disposable so that it will be disposed
   * when the extension is deactivated.
   *
   * @param disposable The disposable to add to the extension's subscriptions.
   */
  static subscribe(disposable: vscode.Disposable): void {
    this._context.subscriptions.push(disposable);
  }

  /**
   * Keep track of all the storage items by registering them with the Extension Manager.
   */
  static registerStorageItem(item: StorageItem<any>): void {
    this._storageItems.push(item);
  }

  /**
   * Return the collection of storage items that are currently registered.
   */
  static getAllStorageItems(): StorageItem<any>[] {
    return this._storageItems;
  }

  private constructor() {}
}
