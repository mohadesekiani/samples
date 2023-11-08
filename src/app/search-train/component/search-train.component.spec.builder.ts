import { BaseBuilder } from 'src/app/core/constant/base-unit-test/base-builder';
import { ISearchTrain } from '../../core/module/interface/search-types.interface';
import { SearchTrainComponent } from './search-train.component';

export class SearchTrainComponentBuilder extends BaseBuilder<ISearchTrain, SearchTrainComponent> {

    override build(): SearchTrainComponent {
        const sut = new SearchTrainComponent(this.router);
        this.afterBuild(sut);

        return sut;
    }
}
