export default abstract class UnaryUseCase<IN> {
  abstract execute(command: IN): Promise<void>;
}
