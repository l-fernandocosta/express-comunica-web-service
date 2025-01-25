export default abstract class UseCase<IN, OUT> {
  abstract execute(command: IN): Promise<OUT>;
}
