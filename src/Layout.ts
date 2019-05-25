import defaultOptions, {
  LayoutOptions,
  Breakpoint,
  Breakpoints,
  MeasurementUnit,
  BreakpointBehavior,
} from './const/defaultOptions'
import invariant from './utils/invariant'

class Layout {
  public defaultUnit: MeasurementUnit = defaultOptions.defaultUnit
  public defaultBehavior: BreakpointBehavior = defaultOptions.defaultBehavior
  public breakpoints: Breakpoints = defaultOptions.breakpoints
  public defaultBreakpointName: string = defaultOptions.defaultBreakpointName
  protected isConfigureCalled: boolean = false

  constructor(options?: Partial<LayoutOptions>) {
    return this.configure(options, false)
  }

  /**
   * Applies global layout options.
   */
  public configure(options: Partial<LayoutOptions>, warnOnMultiple = true) {
    if (warnOnMultiple) {
      invariant(
        !this.isConfigureCalled,
        'Failed to configure Layout: do not call `Layout.configure()` more than once. Layout configuration must remain consistent throughout the application.',
      )
    }

    invariant(
      options === undefined || (options && typeof options === 'object'),
      'Failed to configure Layout: expected an options Object, but got: %o.',
      options,
    )

    Object.keys(options || {}).forEach((optionName) => {
      this[optionName] = options[optionName]
    })

    invariant(
      this.breakpoints,
      'Failed to configure Layout: expected to have at least one breakpoint specified, but got none.',
    )

    invariant(
      this.breakpoints.hasOwnProperty(this.defaultBreakpointName),
      'Failed to configure Layout: cannot use "%s" as the default breakpoint (breakpoint not found).',
      this.defaultBreakpointName,
    )

    invariant(
      this.defaultBreakpointName,
      'Failed to configure Layout: expected "defaultBreakpointName" property set, but got: %s.',
      this.defaultBreakpointName,
    )

    invariant(
      typeof this.defaultBreakpointName === 'string',
      'Failed to configure Layout: expected "defaultBreakpointName" to be a string, but got: %s',
      typeof this.defaultBreakpointName,
    )

    /* Mark configure method as called to prevent its multiple calls */
    this.isConfigureCalled = warnOnMultiple

    return this
  }

  /**
   * Returns the collection of breakpoint names present
   * in the current layout configuration.
   */
  public getBreakpointNames(): string[] {
    return Object.keys(this.breakpoints)
  }

  /**
   * Returns breakpoint options by the given breakpoint name.
   */
  public getBreakpoint(breakpointName: string): Breakpoint | undefined {
    return this.breakpoints[breakpointName]
  }
}

export default new Layout()
