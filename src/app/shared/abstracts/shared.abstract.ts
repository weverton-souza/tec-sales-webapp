import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Store } from '@ngrx/store';

@Component({
    template: ''
})
export abstract class AbstractComponent implements OnInit {
    protected store: Store<any>;
    protected formBuilder: FormBuilder;
    protected route: ActivatedRoute;
    protected router: Router;
    protected storage: StorageMap

    constructor(injector: Injector) {
        this.store = injector.get(Store);
        this.formBuilder = injector.get(FormBuilder);
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.storage = injector.get(StorageMap);
    }

    ngOnInit(): void {
        this.ngOnInitExtend();
    }

    abstract ngOnInitExtend(): void
}
