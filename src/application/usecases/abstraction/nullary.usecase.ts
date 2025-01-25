export default abstract class NullaryUseCase<OUT> {
  abstract execute(): Promise<OUT>;
}
